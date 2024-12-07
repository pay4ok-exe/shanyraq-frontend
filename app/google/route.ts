"use server";

import axios from "axios";

const serverAxios = axios.create({
  baseURL: "https://shanyraqnew-production.up.railway.app/api", // Your backend URL
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});

import { NextResponse } from "next/server";

export async function GET(request: Request) {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");

  if (!code) {
    return NextResponse.json(
      { error: "No code provided by Google" },
      { status: 400 }
    );
  }

  try {
    // Send the authorization code to the backend for token exchange
    const response = await serverAxios.post("/auth/google", { code });

    const { accessToken } = response.data;

    if (accessToken) {
      // Redirect to the login page with the access token in the URL query parameter
      return NextResponse.redirect(
        new URL(`/login?token=${accessToken}`, request.url)
      );
    } else {
      return NextResponse.json(
        { error: "Token not received from Google" },
        { status: 500 }
      );
    }
  } catch (error) {
    console.error("Authentication error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
