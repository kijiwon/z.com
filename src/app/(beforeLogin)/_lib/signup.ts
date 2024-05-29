"use server";

import { redirect } from "next/navigation";

export default async (formData: FormData) => {
  console.log(formData);
  // formData 검증
  if (!formData.get("id")) {
    return { message: "no_id" };
  }
  if (!formData.get("name")) {
    return { message: "no_name" };
  }
  if (!formData.get("password")) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  let shouldRedirect = false;

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        method: "post",
        body: formData,
        credentials: "include",
      }
    );
    console.log(response.status);
    if (response.status === 403) {
      return { message: "user_exists" };
    }
    console.log(await response.json());
    shouldRedirect = true;
  } catch (error) {
    console.error(error);
    return { message: null };
  }

  if (shouldRedirect) {
    redirect("/home");
  } // home페이지로 이동
  // redirect는 try/catch문 안에서 사용할 수 없음
};
