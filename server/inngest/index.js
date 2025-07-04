import User from "../models/User.js";
import { Inngest } from "inngest";

// Create a client to send and receive events
export const inngest = new Inngest({id: "movie-ticket-booking"});

//inngest Function to save user data to a database
const syncUserCreation = inngest.createFunction(
    {id: 'sync-user-created-from-clerk'},
    {event: 'clerk/user.created'},
    async ({event}) => {
        const {id, first_name, last_name, email_addresses, image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name:first_name + ' ' + last_name,
            image: image_url
        }
        await User.create(userData);
    }
)
// Inngest Function to delete user from database
const syncUserDeletion = inngest.createFunction(
    {id: 'delete-user-with-clerk'},
    {event: 'clerk/user.deleted'},
    async ({event}) => {
        const  {id} = event.data
        await User.findByIdAndDelete(id)
    }
)
// Inngest Function to Update user from database
const syncUserUpdation = inngest.createFunction(
    {id: 'Update-user-with-clerk'},
    {event: 'clerk/user.updated'},
    async ({event}) => {
        const {id, first_name,last_name,email_addresses,image_url} = event.data
        const userData = {
            _id: id,
            email: email_addresses[0].email_addresses,
            name: first_name + ' ' + last_name,
            Image: image_url
        }
        await User.findByIdAndUpdate(id, userData)
    }
)

export const functions = [syncUserCreation, 
                            syncUserDeletion,
                            syncUserUpdation];