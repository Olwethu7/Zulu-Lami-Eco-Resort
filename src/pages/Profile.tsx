import { Layout } from "@/components/layout/Layout";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ProfileForm } from "@/components/profile/ProfileForm";
import { BookingHistory } from "@/components/profile/BookingHistory";
import { User, Calendar } from "lucide-react";

const Profile = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-8">
          My Account
        </h1>

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="bookings" className="flex items-center gap-2">
              <Calendar className="h-4 w-4" />
              Booking History
            </TabsTrigger>
          </TabsList>

          <TabsContent value="profile" className="mt-6">
            <ProfileForm />
          </TabsContent>

          <TabsContent value="bookings" className="mt-6">
            <BookingHistory />
          </TabsContent>
        </Tabs>
      </div>
    </Layout>
  );
};

export default Profile;
