import sql from "$lib/db/postgres"

import type { Actions, PageServerLoad } from "./$types";
import { fail, redirect } from '@sveltejs/kit';
import { loginStore } from "$lib/store/loginStore";


// interface InsertUsersData {
//   username: FormDataEntryValue | null
//   email: FormDataEntryValue | null
//   password: FormDataEntryValue | null
// };


// export const load = (async () => {
//   let customLoginStore = loginStore;
//   let status;
//   customLoginStore.subscribe(loginStore => {
//     console.log('---------loginStoreを通りました-----------');
//      status = loginStore.status
//   })
//   return {status}

// }) satisfies PageServerLoad


export const actions = {
  signUp: async ({ cookies, request, url }) => {
    let errorMessage: string[] = [];
    const data = await request.formData();
    const username = data.get('username');
    const email = data.get('email');
    const password = data.get('password');
    const confirmation = data.get('confirmation');
    const columns = ['username', 'email', 'password']

    // const users: InsertUsersData = { username, email, password }
    let msg = '';
    // 確認処理
    if (confirmation != password) {
      msg = 'パスワードと確認パスワードが不一致ですもう一度ご確認ください。'
      errorMessage.push(msg)
    }
    
    // 同じメールアドレスがいないのか
    let getOwners = await sql`select ${sql(columns)} from owners where email = ${email}`
    
      // メールアドレスの確認
      if (getOwners.length) {
        msg = 'このメールアドレスは既に存在しております。他のメールアドレスをご利用ください。'
        errorMessage.push(msg)
      }
      if (!errorMessage.length) {
        await sql`insert into owners
         ${sql(users, 'username', 'email', 'password')}`;
        return
      }
    return fail(400, { errorMessage })

  }
}satisfies Actions;
