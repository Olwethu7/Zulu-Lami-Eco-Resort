# Admin Account Setup Instructions

## Step 1: Create Admin Account

1. Navigate to the registration page at `/login` and click on "Register" tab
2. Create a new account with the following credentials:
   - **Email**: passiveincome1340@gmail.com
   - **Password**: #Admin01
   - **Full Name**: Admin User

3. Complete the email verification if required

## Step 2: Assign Admin Role

After creating the account, the admin role needs to be assigned in the database.

Run this SQL command in your Supabase SQL Editor:

```sql
-- Assign admin role to the new user
INSERT INTO public.user_roles (user_id, role)
SELECT id, 'admin'::app_role
FROM auth.users
WHERE email = 'passiveincome1340@gmail.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 3: Access Admin Dashboard

Once the admin role is assigned:

1. Log out and log back in with the admin credentials
2. Navigate to `/admin/dashboard` to access the admin panel
3. You will have access to:
   - **Dashboard**: Overview of bookings, revenue, and occupancy
   - **Booking Management**: View and manage all booking requests
     - Approve or decline pending bookings
     - View booking details and guest information
     - Real-time updates on booking status

## Admin Capabilities

The admin user can:

✅ View all bookings across the system
✅ Approve or decline booking requests
✅ View detailed guest information
✅ Monitor booking statistics and revenue
✅ Access real-time booking updates
✅ Manage room inventory (coming in future phases)
✅ Manage content and photos (coming in future phases)

## Security Notes

- Admin credentials should be kept secure
- Change the default password after first login
- Admin actions are logged for audit purposes
- Only users with admin role can access the admin panel
