import sql from "$lib/db/postgres"
import type { PageServerLoad, Actions } from './$types';
import { fail } from '@sveltejs/kit';


export const actions = {
  signIn: async ({ request }) => {
    let errorMessage:string[] = [];
    const data = await request.formData();
    const email = data.get('email');
    const password = data.get('password');
    const columns = ['username','email','password']


        const owners = await sql`select ${sql(columns)} from owners 
        where email = ${email} and password = ${password}`
        if(!owners.length){
          errorMessage.push('ユーザーが存在しません。メールアドレスもしくはパスワードを確認してください。');
        }
      
      if (!errorMessage.length) {
        return
      }
    return fail(400, { errorMessage })
  }
} satisfies Actions;