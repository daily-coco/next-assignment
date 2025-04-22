"use server";

export async function handleForm(prevState:any, formData:FormData) {
    // console.log(prevState)
    const password = formData.get('formPassword');

    await new Promise((reslove)=> setTimeout(reslove,3000));

    if(password === '1234') {
        return {
            ok:true,
            errors : []
        }
    } else {
        return {
            errors : [
                '비밀번호를 다시 입력해 주세요!'
            ]
        }
    }
}