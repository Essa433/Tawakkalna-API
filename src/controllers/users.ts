export function createUserRegester(users: any[], newUser: any) {

    const userIndex = users.findIndex((el: { id: any; }) => el.id === newUser.id);
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

// export function createUserLogin(users: any[], newUser: any) {
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



//     bcrypt.hash(req.body.password, saltRounds, function (err, hash) {
//       users
//         .create({
//           username: req.body.username,
//           password: hash,
//         })
//         .then(() => res.json({ msg: "app run" }))
//     })
//   }


