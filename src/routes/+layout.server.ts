export function load(event) {
   const user_id = event.cookies.get("user_id")?.toString()
   const username = event.cookies.get("user")?.toString()

   return {
      userId: user_id,
      username: username
   }
}