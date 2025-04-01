'use client'
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetMeQuery, useUserUpdateMutation } from "@/redux/api/authApi";

import ProfileForm from "./profileForm";
import { StatCard } from "./stat-card";
import { AvatarUpload } from "./avatar-upload";
import LoadingCard from "../shared/LoadingCard";

export default function ProfilePage() {
    const {data:me,isLoading,refetch}=useGetMeQuery('')
    const [updateUser]=useUserUpdateMutation()
    if(isLoading){
        return <LoadingCard/>
    }
    const user=me?.data

  return (
    <div className="container py-8">
      <div className="grid gap-8 md:grid-cols-3">
        {/* Left Column - Profile Picture and Stats */}
        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Profile Picture</CardTitle>
            </CardHeader>
            <CardContent>
              <AvatarUpload initialImage={user?.img}  updateUser={updateUser}/>
            </CardContent>
          </Card>

          <div className="grid gap-4">
            <StatCard
              title="Total Amount" 
              value={`${user?.balance.toLocaleString() || 0}`} 
              icon="dollar"
            />
            <StatCard 
              title="Total Bonus" 
              value={`${user?.bonus.toLocaleString() || 0}`} 
              icon="gift"
            />
          </div>
        </div>

        {/* Right Column - Profile Form */}
        <div className="md:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Profile Information</CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileForm
                name={user?.name}
                email={user?.email}
                mobileNumber={user?.mobileNumber}
                nid={user?.nid}
                updateUser={updateUser}
                refetch={refetch}
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}