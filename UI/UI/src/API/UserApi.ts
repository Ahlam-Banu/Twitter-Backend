
interface User {
    email: string;
    password: string;
}
export async function getLogin(email: string, password: string){
    try {
      const response = await fetch('http://localhost:8082/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        //throw new Error('Failed to login');
        return false;
      }else{
        setCurrentUser(email)
        return true;
      }
    } catch (error) {
      console.error('Error logging in:', error);
      //throw error;
      return false;
    }
    
}
let currentUser: string | null = null;

export function setCurrentUser(email: string) {
  currentUser = email;
  currentUser = currentUser.split('@')[0];
  console.log('currentUser' ,currentUser);
}

export function getCurrentUser() {
  return currentUser;
}