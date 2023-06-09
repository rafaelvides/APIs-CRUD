import { Request,Response } from "express"
import { AppDataSource } from "../data-source"
import { User } from "../models/User"

const userRepository = AppDataSource.getRepository(User)

//method to create user
class UserController{
    static createUser = async(req: Request, res: Response) =>{
         const {firsName, lastName, age, email, password} = req.body;


         try {
            const user = new User ()
            user.firsName = firsName
            user.lastName = lastName
            user.age = age
            user.email = email
            user.password = password

            await userRepository.save(user)

            return res.json({
                Ok: true,
                msg: 'User was saved'
            })
         } catch (error) {
            return res.json({
                Ok: false,
                msg: `Error -> ${error}`
            })
         }
    }

    //Find all users in the database
    static getUsers = async (req:Request, res:Response) =>{
        try {
            const users = await userRepository.find({
                where:{state: true}
            })
            return users.length > 0
            ? res.json({ok : true, users})
            : res.json ({ok: false,msg :"User not fount"})
        } catch (error) {
            return res.json({
                ok : false,
                msg :`Error ->${error}`,
               }); 
        }
    }

    static getById = async (req: Request, res: Response)=>{
        const id = parseInt(req.params.id);
        try {
            const user = await userRepository.findOne({
                where :{id, state : true}
            })
            return user ? res.json({ok : true, user}):
            res.json({
                ok: false , msg : "user not fount"
            })

        } catch (error) {
            return res.json({
                ok : false,
                msg:`Error ->${error}`
            })
        }
    }

    static updateUser = async (req: Request, res:Response) =>{
        const id = parseInt(req.params.id)
        const {firsName,email} = req.body
        const repoUser = AppDataSource.getRepository(User)

        let user: User
        try {
            user = await repoUser.findOneOrFail({
                where : {id, state: true}
            })
            if(!user){
                throw new Error("User dont exist in dabe base")
            }
            user.firsName = firsName
            user.lastName
            user.age
            user.email = email
            user.password
            await repoUser.save(user)
            return res.json({
                ok: true,
                msg: "user was update"
            })
        } catch (error) {
          return res.json({
            ok: false,
            msg: "server error"
          })  
        }
    }

    static deleteUser =async (req: Request, res: Response) =>{
        const id = parseInt(req.params.id)
        const repoUser = AppDataSource.getRepository(User)
        try {
            const user = await repoUser.findOne({
                where:{id}
            })
            console.log(user)
            if(!user){
                throw new Error("user dont exist in date base")
            }
            user.state = false
            await repoUser.save(user)
            return res.json({
                ok: true,
                msg: "user was Delete"
            })
        } catch (error) {
            return res.json({
                ok: false,
                msg: "server Error"
            })
        }
    }
}
export default UserController