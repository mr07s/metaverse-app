import { WebSocket } from "ws";
import { RoomManager } from "./RoomManager";
import { OutgoingMessage } from "./type";
import client from "@repo/db/client";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_PASSWORD } from "./config";
function getRandomId(length: number) {
  const charecters = "abcdefghijkemanopqurtiruu";
  let result = "";
  for (let i = 0; i < length; i++) {
    result += charecters.charAt(Math.floor(Math.random() * charecters.length));
  }
  return result;
}
export class User {
  public id: string;
  private userId?: string;
  private spaceId?: string;
  private x: number;
  private y: number;

  constructor(private ws: WebSocket) {
    this.id = getRandomId(10);
    this.x = 0;
    this.y = 0;
  }

  initHandlers() {
    this.ws.on("message", async (data) => {
      const parsedData = JSON.parse(data.toString());

      switch (parsedData.type) {
        case "join":
          {
            const spaceId = parsedData.payload.spaceId;
            const token = parsedData.payload.token;
            const userId = (jwt.verify(token, JWT_PASSWORD) as JwtPayload)
              .userId;
            if (!userId) {
              this.ws.close();
              return;
            }
            this.userId = userId;
            const space = await client.space.findFirst({
              where: {
                id: spaceId,
              },
            });
            if (!space) {
              this.ws.close();
              return;
            }

            this.spaceId = spaceId;
            (this.x = Math.floor(Math.random() * space?.width)),
              (this.y = Math.floor(Math.random() * space?.height)),
              RoomManager.getInstance().addUser(spaceId, this);
            this.send({
              type: "space-joined",
              payload: {
                spawn: {
                  x: this.x,
                  y: this.y,
                },
                users:
                  RoomManager.getInstance()
                    .rooms.get(spaceId)
                    ?.map((u) => ({ id: u.id })) ?? [],
              },
            });
          }
          RoomManager.getInstance().brodcast(
            {
              type: "user-joined",
              payload: {
                userId: this.userId,
                x: this.x,
                y: this.y,
              },
            },
            this,
            this.spaceId!
          );
          break;
        case "move":
          const moveX = parsedData.payload.x;
          const moveY = parsedData.payload.y;
          const xDisplaceMent = Math.abs(this.x - moveX);
          const yDisplaceMent = Math.abs(this.y - moveY);
          if (
            (xDisplaceMent === 1 && yDisplaceMent === 0) ||
            (xDisplaceMent === 0 && yDisplaceMent === 1)
          ) {
            this.x = moveX;
            this.y = moveY;
            RoomManager.getInstance().brodcast(
              {
                type: "move",
                payload: {
                  x: this.x,
                  y: this.y,
                },
              },
              this,
              this.spaceId!
            );
          } else {
            this.send({
              type: "movement-rejected",
              payload: {
                x: this.x,
                y: this.y,
              },
            });
          }
      }
    });
  }
  send(payload: OutgoingMessage) {
    this.ws.send(JSON.stringify(payload));
  }
}
