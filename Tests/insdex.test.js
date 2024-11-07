const axios2 = require("axios");

const BACKEND_URL = "http://localhost:3000";
const WS_URL = "ws://localhost:3001";

const axios = {
  post: async (...args) => {
    // console.log(...args);
    try {
      // console.log("Inside try");
      const res = await axios2.post(...args);
      // console.log(res);
      return res;
    } catch (e) {
      // console.log(e.response);
      return e.response;
    }
  },
  get: async (...args) => {
    try {
      const res = await axios2.get(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  put: async (...args) => {
    try {
      const res = await axios2.put(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
  delete: async (...args) => {
    try {
      const res = await axios2.delete(...args);
      return res;
    } catch (e) {
      return e.response;
    }
  },
};

// describe("Authentication", () => {
//   test("User is able to sign up only once", async () => {
//     const username = "kirat" + Math.random() + "@gmail.com"; // kirat0.12331313
//     const password = "12345689";
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     // console.log(response);
//     expect(response?.status)?.toBe(200);
//     const updatedResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     expect(updatedResponse.status).toBe(400);
//   });

//   test("Signup request fails if the username is empty", async () => {
//     const username = "kirat" + Math.random() + "@gmail.com"; // kirat0.12331313
//     const password = "12345689";

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       password,
//     });

//     expect(response?.status).toBe(400);
//   });

//   test("Signin succeeds if the username and password are correct", async () => {
//     const username = "kirat" + Math.random() + "@gmail.com"; // kirat0.12331313
//     const password = "12345689";

//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });

//     expect(response?.status).toBe(200);
//     expect(response.data.token).toBeDefined();
//   });

//   test("Signin fails if the username and password are incorrect", async () => {
//     const username = "kirat" + Math.random() + "@gmail.com"; // kirat0.12331313
//     const password = "12345689";

//     await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       role: "admin",
//     });

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username: "WrongUsername",
//       password,
//     });

//     expect(response.status).toBe(403);
//   });
// });

// describe("User Metadata Endpoint", () => {
//   let token = "";
//   let avatarId = "";
//   let userId = "";

//   beforeAll(async () => {
//     const username = `Soumya${Math.random()}@gmail.com`;
//     const password = "123456789";
//     const type = "admin";
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     userId = signupResponse.data.userId;

//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     //   expect(response.status).toBe(200);
//     token = response.data.token;
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     avatarId = avatarResponse.data.avatarId;
//   });

//   test("User can not update their meta data with wrong avatar id", async () => {
//     // conso;
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: "123123123",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     expect(response.status).toBe(400);
//   });

//   test("User can update their  metadata with the right avatar id", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: avatarId,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     expect(response.status).toBe(200);
//   });

//   test("User can not  update their  metadata if the authorization header is not present", async () => {
//     const response = await axios.post(`${BACKEND_URL}/api/v1/user/metadata`, {
//       avatarId: avatarId,
//     });
//     expect(response.status).toBe(403);
//   });
// });

// describe("User Avatar information", () => {
//   let token;
//   let avatarId;
//   let userId;

//   beforeAll(async () => {
//     const username = `Soumya${Math.random()}@gmail.com`;
//     const password = "123456789";
//     const type = "admin";

//     //Signing up the user
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type,
//     });
//     userId = signupResponse.data.userId;

//     //Signing in the user
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     //   expect(response.status).toBe(200);
//     token = response.data.token;

//     //creating an avatar and getting back the avatar id
//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     avatarId = avatarResponse.data.avatarId;

//     //Updating the user avataar data
//     const updatedResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/user/metadata`,
//       {
//         avatarId: avatarId,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );

//     console.log(avatarId);
//     console.log(updatedResponse.status);
//   });

//   test("Getting back avatar information for a user", async () => {
//     const response = await axios.get(
//       `${BACKEND_URL}/api/v1/user/metadata/bulk?ids=[${userId}]`,
//       {
//         headers: {
//           authorization: `Bearer ${token}`,
//         },
//       }
//     );
//     console.log(response.data);
//     expect(response.data.avatars.length).toBe(1);
//     expect(response.data.avatars[0].userId).toBe(userId);
//   });

//   test("Available avatars lists the recently created avatars", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/avatar`);
//     expect(response.data.avatars.length).not.toBe(0);
//     const currentAvatar = response.data.avatars.find((x) => x.id == avatarId);
//   });
// });

// describe("Space Information", () => {
//   let createdMapId;
//   let element1Id;
//   let element2Id;
//   let admintoken;
//   let adminId;

//   let usertoken;
//   let userId;
//   beforeAll(async () => {
//     const username = `Soumya${Math.random()}@gmail.com`;
//     const password = "123456789";
//     // const type = "admin";

//     //Signing up the admin
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     adminId = signupResponse.data.userId;
//     console.log(adminId);
//     //Signing in the admin
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     //   expect(response.status).toBe(200);
//     admintoken = response.data.token;
//     // console.log("admintoken");
//     console.log(admintoken);
//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: "-user" + username,
//         password,
//         type: "user",
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     // console.log("User_Signup");
//     // console.log(userId);
//     //Signing in the admin
//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: "-user" + username,
//         password,
//         type: "user",
//       }
//     );
//     usertoken = userSigninResponse.data.token;
//     // console.log(usertoken);

//     const elementResponse1 = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     // console.log(elementResponse1.data.id);
//     const elementResponse2 = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     element1Id = elementResponse1.data.id;
//     element2Id = elementResponse2.data.id;
//     // // console.log(element1Id);
//     // // console.log(element2Id);

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     console.log("Hi there before map Id");

//     createdMapId = mapResponse.data.mapId;
//     // console.log("AfterMap Id");
//     // // console.log(map);
//     // console.log(createdMapId);
//   });

//   test("User is able to create a space ", async () => {
//     if (createdMapId) {
//       const spaceResponse = await axios.post(
//         `${BACKEND_URL}/api/v1/space`,
//         {
//           name: "Test",
//           dimensions: "100x200",
//           createdMapId,
//         },
//         {
//           headers: {
//             authorization: `Bearer ${usertoken}`,
//           },
//         }
//       );
//       console.log(spaceResponse);
//       expect(spaceResponse.data.spaceId).toBeDefined();
//     }
//   });

//   test("User is able to create an empty space without mapid", async () => {
//     console.log("Inside the test");
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     console.log(response);

//     expect(response.data.spaceId).toBeDefined();
//   });

//   test("User is not able to create a space without mapid and dimensions", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     expect(response.status).toBe(400);
//   });

//   test("User should not be able to delete a space that does not exist", async () => {
//     const response = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/randomIdDoesnotExist`,
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     expect(response.status).toBe(400);
//   });

//   test("User should  be able to delete a space that does  exist", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     const spaceId = response.data.spaceId;
//     expect(response.data.spaceId).toBeDefined();

//     const deleteResponse = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     expect(deleteResponse.status).toBe(200);
//   });

//   test("User should not be able to delete a space ceratd by another user", async () => {
//     const response = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     const spaceId = response.data.spaceId;
//     expect(response.data.spaceId).toBeDefined();

//     const deleteResponse = await axios.delete(
//       `${BACKEND_URL}/api/v1/space/${spaceId}`,
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     expect(deleteResponse.status).toBe(403);
//   });

//   test("Admin initially doesnot have any spaces", async () => {
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//       headers: {
//         authorization: `Bearer ${admintoken}`,
//       },
//     });
//     expect(response.data.spaces.length).toBe(0);
//   });

//   test("Admin initially doesnot have any spaces", async () => {
//     const spaceCreateResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     const response = await axios.get(`${BACKEND_URL}/api/v1/space/all`, {
//       headers: {
//         authorization: `Bearer ${admintoken}`,
//       },
//     });
//     const filteredSpace = response.data.spaces.find(
//       (x) => x.id == spaceCreateResponse.data.spaceId
//     );
//     expect(response.data.spaces.length).toBe(1);
//     expect(filteredSpace).toBeDefined();
//   });
// });

describe("Arena Information", () => {
  let mapId;
  let element1Id;
  let element2Id;
  let admintoken;
  let adminId;
  let spaceId;
  let usertoken;
  let userId;
  beforeAll(async () => {
    const username = `Soumya${Math.random()}@gmail.com`;
    const password = "123456789";

    //Signing up the admin
    const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
      username,
      password,
      type: "admin",
    });
    adminId = signupResponse.data.userId;

    //Signing in the admin
    const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
      username,
      password,
    });
    //   expect(response.status).toBe(200);
    admintoken = response.data.token;

    const userSignupResponse = await axios.post(
      `${BACKEND_URL}/api/v1/signup`,
      {
        username: "-user" + username,
        password,
        type: "user",
      }
    );
    userId = userSignupResponse.data.userId;

    //Signing in the admin
    const userSigninResponse = await axios.post(
      `${BACKEND_URL}/api/v1/signin`,
      {
        username: "-user" + username,
        password,
      }
    );
    usertoken = userSigninResponse.data.token;
    console.log(usertoken);

    const elementResponse1 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${admintoken}`,
        },
      }
    );

    const elementResponse2 = await axios.post(
      `${BACKEND_URL}/api/v1/admin/element`,
      {
        imageUrl:
          "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
        width: 1,
        height: 1,
        static: true,
      },
      {
        headers: {
          authorization: `Bearer ${admintoken}`,
        },
      }
    );
    element1Id = elementResponse1.data.id;
    element2Id = elementResponse2.data.id;

    const mapResponse = await axios.post(
      `${BACKEND_URL}/api/v1/admin/map`,
      {
        thumbnail: "https://thumbnail.com/a.png",
        dimensions: "100x200",
        name: "100 person interview room",
        defaultElements: [
          {
            elementId: element1Id,
            x: 20,
            y: 20,
          },
          {
            elementId: element1Id,
            x: 18,
            y: 20,
          },
          {
            elementId: element2Id,
            x: 19,
            y: 20,
          },
        ],
      },
      {
        headers: {
          authorization: `Bearer ${admintoken}`,
        },
      }
    );

    mapId = mapResponse.data.mapId;
    console.log(mapId);
    const spaceResponse = await axios.post(
      `${BACKEND_URL}/api/v1/space`,
      {
        name: "Test",
        dimensions: "100x200",
        mapId: mapId,
      },
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );
    spaceId = spaceResponse.data.spaceId;
    console.log(spaceResponse.data);
    console.log(spaceId);
  });

  // test("incorrect space id returns 400", async () => {
  //   const response = await axios.get(`${BACKEND_URL}/api/v1/space/454545`, {
  //     headers: {
  //       authorization: `Bearer ${usertoken}`,
  //     },
  //   });
  //   expect(response.status).toBe(400);
  // });

  // test("Correct space id returns all the elements", async () => {
  //   const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
  //     headers: {
  //       authorization: `Bearer ${usertoken}`,
  //     },
  //   });
  //   console.log(response.data);
  //   expect(response.data.dimensions).toBe("100x200");
  //   expect(response.data.elements.length).toBe(3);
  // });

  //Only this is not working*******************************************
  test("Delete endpoint is able to delete an element", async () => {
    const response = await axios.get(`${BACKEND_URL}/api/v1/space/${spaceId}`, {
      headers: {
        authorization: `Bearer ${usertoken}`,
      },
    });
    console.log(response.data.elements[0].id);
    // const id = response.data.elements[0].id;

    const deleteResponse = await axios.delete(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        id: response.data.elements[0].id,
      },
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );
    console.log(deleteResponse);

    const newResponse = await axios.get(
      `${BACKEND_URL}/api/v1/space/${spaceId}`,
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );

    expect(newResponse.data.elements.length).toBe(2);
  });

  test("Adding an element works as expected", async () => {
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        elementId: element1Id,
        spaceId: spaceId,
        x: "50",
        y: "20",
      },
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );
    console.log(response);
    const newResponse = await axios.get(
      `${BACKEND_URL}/api/v1/space/${spaceId}`,
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );

    expect(newResponse.data.elements.length).toBe(4);
  });

  test("Adding an element fails outside the boundary", async () => {
    console.log(element1Id);
    console.log(spaceId);
    console.log(usertoken);
    const response = await axios.post(
      `${BACKEND_URL}/api/v1/space/element`,
      {
        elementId: element1Id,
        spaceId: spaceId,
        x: "50000",
        y: "20000",
      },
      {
        headers: {
          authorization: `Bearer ${usertoken}`,
        },
      }
    );
    console.log(response);

    expect(response.status).toBe(400);
  });
});

//***************************************Pending***************************************************************
// describe("Admin endpoint", () => {
//   let admintoken;
//   let adminId;
//   let usertoken;
//   let userId;
//   beforeAll(async () => {
//     const username = `Soumya${Math.random()}@gmail.com`;
//     const password = "123456789";

//     //Signing up the admin
//     const signupResponse = await axios.post(`${BACKEND_URL}/api/v1/signup`, {
//       username,
//       password,
//       type: "admin",
//     });
//     adminId = signupResponse.data.userId;

//     //Signing in the admin
//     const response = await axios.post(`${BACKEND_URL}/api/v1/signin`, {
//       username,
//       password,
//     });
//     //   expect(response.status).toBe(200);
//     admintoken = response.data.token;

//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: "-user" + username,
//         password,
//         type: "user",
//       }
//     );
//     userId = userSignupResponse.data.userId;

//     //Signing in the admin
//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: "-user" + username,
//         password,
//       }
//     );
//     usertoken = userSigninResponse.data.token;
//   });

//   test("User is not able to hit admin endpoint", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );

//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );

//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/123`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );

//     expect(elementResponse.status).toBe(403);

//     expect(mapResponse.status).toBe(403);

//     expect(avatarResponse.status).toBe(403);

//     expect(updateElementResponse.status).toBe(403);
//   });

//   test("Admin is able to hit admin endpoint", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     const avatarResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/avatar`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQm3RFDZM21teuCMFYx_AROjt-AzUwDBROFww&s",
//         name: "Timmy",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     expect(elementResponse.status).toBe(200);

//     expect(mapResponse.status).toBe(200);

//     expect(avatarResponse.status).toBe(200);
//   });

//   test("Admin is able to update the img url for an element", async () => {
//     const elementResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     const elementId = elementResponse.data.id;
//     const updateElementResponse = await axios.put(
//       `${BACKEND_URL}/api/v1/admin/element/${elementId}`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     expect(updateElementResponse.status).toBe(200);
//   });
// });

// describe("Websocket tests", () => {
//   let admintoken;
//   let adminId;
//   let usertoken;
//   let userId;
//   let mapId;
//   let element1Id;
//   let element2Id;
//   let spaceId;
//   let ws1;
//   let ws2;
//   let ws1Message = [];
//   let ws2Message = [];
//   let adminX;
//   let adminY;
//   let userX;
//   let userY;

//   function waitForAndPopLatestMessage(messageArray) {
//     return new Promise((r) => {
//       if (messageArray.length > 0) {
//         resolve(messageArray.shift());
//       } else {
//         let interval = setInterval(() => {
//           if (messageArray.length > 0) {
//             resolve(messageArray.shift());
//             clearInterval(interval);
//           }
//         }, 100);
//       }
//     });
//   }
//   async function setupHTTP() {
//     const username = `Soumya-${Math.random()}`;
//     const password = "123456789";

//     const adminSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username,
//         password,
//         type: "admin",
//       }
//     );

//     const adminSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username,
//         password,
//       }
//     );
//     adminId = adminSignupResponse.data.userId;
//     admintoken = adminSigninResponse.data.token;

//     const userSignupResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signup`,
//       {
//         username: username + `-user`,
//         password: "12345",
//         type: "user",
//       }
//     );

//     const userSigninResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/signin`,
//       {
//         username: username + `-user`,
//         password: "12345",
//       }
//     );
//     userId = userSignupResponse.data.userId;
//     usertoken = userSigninResponse.data.token;

//     const elementResponse1 = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     const elementResponse2 = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/element`,
//       {
//         imageUrl:
//           "https://encrypted-tbn0.gstatic.com/shopping?q=tbn:ANd9GcRCRca3wAR4zjPPTzeIY9rSwbbqB6bB2hVkoTXN4eerXOIkJTG1GpZ9ZqSGYafQPToWy_JTcmV5RHXsAsWQC3tKnMlH_CsibsSZ5oJtbakq&usqp=CAE",
//         width: 1,
//         height: 1,
//         static: true,
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );
//     element1Id = elementResponse1.data.id;
//     element2Id = elementResponse2.data.id;

//     const mapResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/admin/map`,
//       {
//         thumbnail: "https://thumbnail.com/a.png",
//         dimensions: "100x200",
//         name: "100 person interview room",
//         defaultElements: [
//           {
//             elementId: element1Id,
//             x: 20,
//             y: 20,
//           },
//           {
//             elementId: element1Id,
//             x: 18,
//             y: 20,
//           },
//           {
//             elementId: element2Id,
//             x: 19,
//             y: 20,
//           },
//         ],
//       },
//       {
//         headers: {
//           authorization: `Bearer ${admintoken}`,
//         },
//       }
//     );

//     mapId = mapResponse.data.id;

//     const spaceResponse = await axios.post(
//       `${BACKEND_URL}/api/v1/space`,
//       {
//         name: "Test",
//         dimensions: "100x200",
//         mapId: { mapId },
//       },
//       {
//         headers: {
//           authorization: `Bearer ${usertoken}`,
//         },
//       }
//     );
//     spaceId = spaceResponse.data.spaceId;
//   }

//   async function setupWs() {
//     ws1 = new WebSocket(WS_URL);

//     ws1.onmessage = (event) => {
//       ws1Message.push(JSON.parse(event.data));
//     };
//     await new Promise((r) => {
//       ws1.onopen = r;
//     });

//     ws2 = new WebSocket(WS_URL);

//     ws2.onmessage = (event) => {
//       ws2Message.push(JSON.parse(event.data));
//     };
//     await new Promise((r) => {
//       ws2.onopen = r;
//     });
//   }

//   beforeAll(async () => {
//     setupHTTP(), setupWs();
//   });

//   test("Getting back acknowledgement  for joining the space", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: admintoken,
//         },
//       })
//     );
//     const message1 = await waitForAndPopLatestMessage(ws1Message);

//     ws2.send(
//       JSON.stringify({
//         type: "join",
//         payload: {
//           spaceId: spaceId,
//           token: usertoken,
//         },
//       })
//     );

//     const message2 = await waitForAndPopLatestMessage(ws2Message);
//     const message3 = await waitForAndPopLatestMessage(ws2Message);

//     expect(message1.type).toBe("space-joined");
//     expect(message2.type).toBe("space-joined");

//     expect(message1.payload.users.length).toBe(0);
//     expect(message2.payload.users.length).toBe(1);

//     expect(message3.type).toBe("user-joined");
//     expect(message3.payload.x).toBe(message2.payload.spawn.x);
//     expect(message3.payload.y).toBe(message2.payload.spawn.y);
//     expect(message3.payload.userId).toBe(userId);

//     adminX = message1.payload.spawn.x;
//     adminY = message1.payload.spawn.y;

//     userX = message2.payload.spawn.x;
//     userY = message2.payload.spawn.y;
//   });

//   test("User should not be able to move acreoos the bondary", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "move",
//         payload: {
//           x: 1000000,
//           y: 2000000,
//         },
//       })
//     );

//     const message = await waitForAndPopLatestMessage(ws1Message);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("User should not be able to move to blocks at a time", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "move",
//         payload: {
//           x: adminX + 2,
//           y: adminY,
//         },
//       })
//     );
//     const message = await waitForAndPopLatestMessage(ws1Message);
//     expect(message.type).toBe("movement-rejected");
//     expect(message.payload.x).toBe(adminX);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("correct movement should be broadcasted to the other socket", async () => {
//     ws1.send(
//       JSON.stringify({
//         type: "move",
//         payload: {
//           x: adminX + 1,
//           y: adminY,
//           userId: adminId,
//         },
//       })
//     );
//     const message = await waitForAndPopLatestMessage(ws2Message);
//     expect(message.type).toBe("movement");
//     expect(message.payload.x).toBe(adminX + 1);
//     expect(message.payload.y).toBe(adminY);
//   });

//   test("If the user leavs the other user recive a leav event", async () => {
//     ws1.close();
//     const message = await waitForAndPopLatestMessage(ws2Message);
//     expect(message.type).toBe("user-left");
//     expect(message.payload.x).toBe(adminX + 1);
//     expect(message.payload.userId).toBe(adminId);
//   });
// });
