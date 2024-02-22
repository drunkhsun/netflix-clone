import axios from 'axios';
import Link from 'next/link';
import Input from '@/components/Input';
import { useCallback, useState } from 'react';
import { signIn } from 'next-auth/react';

import { FcGoogle } from 'react-icons/fc';
import { FaGithub } from 'react-icons/fa';

const Login = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const [variant, setVariant] = useState('login');
  const [recaptcha, setRecaptcha] = useState('');

  const toggleVariant = useCallback(() => {
    setVariant(currentVariant => (currentVariant === 'login' ? 'register' : 'login'));
  }, []);

  const toggleRecaptcha = useCallback(() => {
    setRecaptcha('known');
  }, []);

  const login = useCallback(async () => {
    try {
      await signIn('credentials', {
        email,
        password,
        callbackUrl: '/profiles'
      });
    } catch (error) {
      console.log(error);
    }
  }, [email, password]);

  const register = useCallback(async () => {
    try {
      await axios.post('/api/register', {
        email,
        name,
        password
      });

      login();
    } catch (error) {
      console.log(error);
    }
  }, [email, name, password, login]);

  return (
    <div className="relative h-full w-full bg-[url('/images/hero.jpg')] bg-no-repeat bg-center bg-fixed bg-cover">
      <div className='bg-black w-full h-full lg:bg-opacity-50'>
        <nav className='px-12 py-5'>
          <img
            src='/images/logo.png'
            alt='Logo'
            className='h-10'
          />
        </nav>
        <div className='flex justify-center'>
          <div className='bg-black bg-opacity-70 px-16 py-16 self-center mt-2 lg:w-2/5 lg:max-w-md rounded w-full'>
            <h2 className='text-white text-4xl mb-8 font-bold'>{variant === 'login' ? '登入' : '註冊'}</h2>
            <div className='flex flex-col gap-4'>
              {variant === 'register' && (
                <Input
                  label='名稱'
                  onChange={(e: any) => setName(e.target.value)}
                  id='name'
                  value={name}
                />
              )}
              <Input
                label='電子郵件地址或電話號碼'
                onChange={(e: any) => setEmail(e.target.value)}
                id='email'
                type='email'
                value={email}
              />
              <Input
                label='密碼'
                onChange={(e: any) => setPassword(e.target.value)}
                id='password'
                type='password'
                value={password}
              />
            </div>
            <button
              onClick={variant === 'login' ? login : register}
              className='bg-red-600 py-3 text-white rounded-md w-full mt-10 hover:bg-red-700 transition'
            >
              {variant === 'login' ? '登入' : '註冊'}
            </button>
            <div className='flex flex-row items-center gap-4 mt-8 justify-center'>
              <div
                onClick={() => signIn('google', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                '
              >
                <FcGoogle size={30} />
              </div>
              <div
                onClick={() => signIn('github', { callbackUrl: '/profiles' })}
                className='
                  w-10
                  h-10
                  bg-white
                  rounded-full
                  flex
                  items-center
                  justify-center
                  cursor-pointer
                  hover:opacity-80
                  transition
                '
              >
                <FaGithub size={30} />
              </div>
            </div>
            <p className='text-neutral-400 mt-12'>
              {variant === 'login' ? '尚未加入 Netflix？' : '已經加入了？'}
              <span
                className='text-white ml-1 hover:underline cursor-pointer'
                onClick={toggleVariant}
              >
                {variant === 'login' ? '馬上註冊' : '馬上登入'}
              </span>
            </p>
            <p className='text-neutral-500 text-sm mt-3'>
              此頁面受到 Google reCAPTCHA 保護，以確認您不是機器人。
              <span
                className='text-blue-600 hover:underline cursor-pointer'
                onClick={toggleRecaptcha}
              >
                進一步了解。
              </span>
            </p>
            {recaptcha === 'known' && (
              <p className='text-neutral-500 text-sm mt-3 duration-150'>
                由 Google reCAPTCHA 收集的資訊受 Google《
                <Link
                  className='text-blue-600 hover:underline cursor-pointer'
                  href='https://policies.google.com/privacy'
                  target='_blank'
                  >
                  隱私權聲明
                </Link>
                》與《
                <Link
                  className='text-blue-600 hover:underline cursor-pointer'
                  href='https://policies.google.com/terms'
                  target='_blank'
                >
                  服務條款
                </Link>
                》約束，用來提供、維持並提升 reCAPTCHA 服務，並且維繫一般安全（Google 不會用於個人化廣告）。
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
