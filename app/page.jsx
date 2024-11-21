import { redirect } from 'next/navigation';

export default function Home() {
  const user = true;

  if (user) {
    redirect('/my-websites');
  } else {
    redirect('/login');
  }
}
