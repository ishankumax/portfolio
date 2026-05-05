import { signInWithEmailAndPassword, signOut, onAuthStateChanged, RecaptchaVerifier, signInWithPhoneNumber } from 'firebase/auth';
import { auth } from './firebase';

export async function login(email, password) {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

// Set up reCAPTCHA verifier for phone auth
export function setupRecaptcha(containerId) {
  if (!window.recaptchaVerifier) {
    window.recaptchaVerifier = new RecaptchaVerifier(auth, containerId, {
      size: 'invisible' // or 'normal' to display the widget
    });
  }
}

// Send OTP to phone
export async function sendPhoneOTP(phoneNumber) {
  try {
    const appVerifier = window.recaptchaVerifier;
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    window.confirmationResult = confirmationResult;
    return { success: true, error: null };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Verify OTP
export async function verifyOTP(code) {
  try {
    const result = await window.confirmationResult.confirm(code);
    return { user: result.user, error: null };
  } catch (error) {
    return { user: null, error: error.message };
  }
}

export async function logout() {
  await signOut(auth);
}

export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, callback);
}
