import mongoose from "mongoose";

const userIds = [
  new mongoose.Types.ObjectId(),
  new mongoose.Types.ObjectId(),
];

export const users = [
  {
    _id: userIds[0],
    firstName: "test",
    lastName: "me",
    email: "test@gmail.com",
    password: "$2b$10$dsasdgsagasda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
    picturePath: "jhan.png",
    friends: [],
    skills: [],
    aboutMe: "",
    location: "San Fran, CA",
    occupation: "Software Engineer",
    viewedProfile: 14561,
    impressions: 888822,
    createdAt: 1115211422,
    updatedAt: 1115211422,
    __v: 0,
  },
  // {
  //   _id: userIds[1],
  //   firstName: "Steve",
  //   lastName: "Ralph",
  //   email: "thataaa@gmail.com",
  //   password: "$!FEAS@!O)_IDJda//G9JxQ4bQ8KXf4OAIe/X/AK9skyWUy",
  //   picturePath: "p3.jpeg",
  //   friends: [],
  //   location: "New York, CA",
  //   occupation: "Degenerate",
  //   viewedProfile: 12351,
  //   impressions: 55555,
  //   createdAt: 1595589072,
  //   updatedAt: 1595589072,
  //   __v: 0,
  // },
]

// export const posts = [
//   {
//     _id: new mongoose.Types.ObjectId(),
//     userId: userIds[0],
//     firstName: "Steve",
//     lastName: "Ralph",
//     location: "New York, CA",
//     description: "Some really long random description",
//     picturePath: "post1.jpeg",
//     userPicturePath: "p3.jpeg",
//     likes: new Map([
//       [userIds[0], true]
//       [userIds[1], true]
//     ]),
//     comments: [
//       {
//         "userIdComment": "64a47b0b6b4ac87a617cf322",
//         "nombre": "Andres Sierra",
//         "mensaje": "Genial!"
//       },
//       {
//         "userIdComment": "64a47b0b6b4ac87a617cf326",
//         "nombre": "Rosa Arias",
//         "mensaje": "Super!!"
//       },
//       {
//         "userIdComment": "64a47b0b6b4ac87a617cf323",
//         "nombre": "Felipe Yepes",
//         "mensaje": "Vamos bien!"
//       }
//     ],
//   }
// ];
