export function upsertUserController(users: any[], newUser: any) {
	const userIndex = users.findIndex((el) => el.id === newUser.id);
	if (userIndex === -1) {
		users.push(newUser);
	} else {
		users[userIndex] = {
			...users[userIndex],
			...newUser,
		};
	}
	return users;
}











// import { prismaClient } from "../models/users";
// import { prismaClient } from './prisma';


// import { Type } from "@sinclair/typebox";
// import { FastifyReplyType, FastifyRequestType } from "fastify/types/type-provider";
// import { prismaClient } from "../prisma";



// export const addNewUser = async (request:FastifyRequestType, reply:FastifyReplyType) => {
//        const newUser: any = request.body;
//        console.log(newUser)
//     const user = await prismaClient.user.create({
//         data:newUser,
//     })
//     return { 'msg': 'User added' }
// }

// function find() {
//     throw new Error("Function not implemented.");
// }



// // update users
// export const updateUser = async (req: any, reply: any) => {
//     try {
//         const id = req.params.id
//         let result = await findByIdAndUpdate(id, req.body, {
//             new: true
//         });
//         return result
//     } catch (err) {
//         throw (err)
//     }
// }

// function findByIdAndUpdate(id: any, body: any, arg2: { new: boolean; }) {
//     throw new Error("Function not implemented.");
// }



// // delete user
// export const deleteUser = async (req: any, reply: any) => {
//     const deleteUser = await prismaClient.user.delete({
//         where: {
//           email: 'bert@prisma.io',
//         },
//       })
      
    
// }


// get all users 
// export const getAllUsers = async (req: any, reply: any) => {
//     try {
//         let users = await find();
//         return users;
//     } catch (err) {
//         throw (err)
//     }
// }


// // get single user by id 
// export const getSingleUser = async (req: any, reply: any) => {
//     try {
//         const id = req.params.id
//         let user = await findById(id);
//         return user
//     } catch (err) {
//         throw (err)
//     }
// }

// function findById(id: any) {
//     throw new Error("Function not implemented.");
// }








// export function createUserController(users: any[], newUser: any) {
//     const userIndex = users.findIndex((el: { id: any; }) => el.id === newUser.id);
//     if (userIndex === -1) {
    //         users.push(newUser);
//     } else {
//         users[userIndex] = {
//             ...users[userIndex],
//             ...newUser,
//         };
//     }
//     return users;
// }
