import { Layout } from "@/components/layout/Layout";
import { BookingHistory } from "@/components/profile/BookingHistory";

const Bookings = () => {
  return (
    <Layout>
      <div className="container py-8 max-w-4xl">
        <h1 className="font-montserrat text-3xl font-bold text-primary mb-8">
          My Bookings
        </h1>
        <BookingHistory />
      </div>
    </Layout>
  );
};

export default Bookings;
