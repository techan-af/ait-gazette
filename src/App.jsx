import { useState } from 'react'
import NewsFrontend from './components/NewsFrontend'
import { SignedIn, SignedOut, SignInButton} from "@clerk/clerk-react";

function App() {
  
  return (
    <>
    {/* <NewsFrontend /> */}


        {/* Button Container - Flexbox for layout */}
          <header>
            <SignedOut>
                  <div className="min-h-screen bg-white text-black flex flex-col justify-center items-center font-franklin">
                    <div className="max-w-md w-full  py-12 sm:py-20 lg:py-24">
                      <h1 className="text-4xl font-bold tracking-tight mb-8 text-center">
                        Welcome to <br /> <span className='nyt text-4xl sm:text-5xl md:text-6xl'>the AIT Gazette</span>
                      </h1>
                            <div className='flex flex-col space-y-4 w-full justify-center items-center bg-slate-800 text-white rounded-md p-4'>
                              <SignInButton />
                            </div>
                            <p className="mt-8 text-center text-gray-600 text-sm">
                          By continuing, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
                      </p>
                    </div>
                  </div>
            </SignedOut>
            <SignedIn>
              <NewsFrontend />
            </SignedIn>
          </header>

        {/* Small text at the bottom */}
       
    </>
  )
}


export default App
