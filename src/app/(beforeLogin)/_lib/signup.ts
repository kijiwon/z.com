/* eslint-disable import/no-anonymous-default-export */
"use server";

import { redirect } from "next/navigation";
import { signIn } from "@/auth";
import axios from "axios";

export default async (
  prevState: { message: string | null } | undefined,
  formData: FormData
) => {
  // formData 검증
  if (!formData.get("id") || !(formData.get("id") as string)?.trim()) {
    return { message: "no_id" };
  }
  if (
    !formData.get("nickname") ||
    !(formData.get("nickname") as string)?.trim()
  ) {
    return { message: "no_name" };
  }
  if (
    !formData.get("password") ||
    !(formData.get("password") as string)?.trim()
  ) {
    return { message: "no_password" };
  }
  if (!formData.get("image")) {
    return { message: "no_image" };
  }
  let shouldRedirect = false;

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BASE_URL}/api/users`,
      {
        // method: "post",
        body: formData,
        credentials: "include",
      }
    );
    console.log(response);
    if (response.status === 403) {
      return { message: "user_exists" };
    }

    shouldRedirect = true;
    await signIn("credentials", {
      username: formData.get("id"),
      password: formData.get("password"),
      redirect: false,
    });
  } catch (err) {
    return { message: null };
  }

  if (shouldRedirect) {
    redirect("/home");
  } // home페이지로 이동
  // redirect는 try/catch문 안에서 사용할 수 없음
};
