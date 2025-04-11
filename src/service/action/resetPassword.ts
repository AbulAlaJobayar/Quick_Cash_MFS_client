interface IResetPassword {
  token: string;
  newPin: string;
  id: string;
}
const resetPassword = async (payload: IResetPassword) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/auth/reset-password`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: payload.token as string,
        },
        body: JSON.stringify({
          id: payload.id,
          newPin: payload.newPin,
        }),
      }
    );

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Reset password error:", error);
    return {
      message: "An error occurred while resetting password",
      success: false,
    };
  }
};
export default resetPassword;
