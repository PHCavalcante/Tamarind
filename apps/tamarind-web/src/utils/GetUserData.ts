"use client";

import { useUser } from '@clerk/nextjs'

export default function GetUserData() {
  const { isLoaded, isSignedIn, user } = useUser()
  if (!isLoaded || !isSignedIn) {
    return null
  }
  return user;
}