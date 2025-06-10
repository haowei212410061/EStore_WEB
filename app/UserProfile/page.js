"use client"
import { Header } from "@/components/Header";
import Footer from "@/components/footer";
import { UserProfile } from "@/components/pages/UserProfile";
export default function page() {
    
  return (
    <div className="userProfile w-[100%] h-[100%]">
      <Header isHidden={true} />
      <div className="userProfile mt-10 w-full h-full text-center mb-20">
        <h1>user profile</h1>
        <UserProfile />
      </div>
      <Footer />
    </div>
  );
}
