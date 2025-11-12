# Admin Account Setup Instructions

## Step 1: Create Admin Account

1. Navigate to the registration page at `/login` and click on "Register" tab
2. Create a new account with the following credentials:
   - **Email**: admin@zululami.com
   - **Password**: Admin123
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
WHERE email = 'admin@zululami.com'
ON CONFLICT (user_id, role) DO NOTHING;
```

## Step 3: Access Admin Dashboard

Once the admin role is assigned:

1. Log out and log back in with the admin credentials
2. Navigate to `/admin/login` to access the admin panel
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

## Additional Admin Features

### User Management
- View all registered users and their profiles
- Monitor user activity and booking history
- Manage user roles and permissions

### Content Management
- Add and edit accommodation listings
- Upload and manage property photos
- Update pricing and availability calendars
- Manage cultural experience offerings

### Analytics & Reporting
- View occupancy rates and revenue trends
- Generate booking reports by date range
- Monitor popular accommodations and experiences
- Track seasonal booking patterns

### System Settings
- Configure booking policies and cancellation rules
- Manage seasonal pricing adjustments
- Set up promotional offers and discounts
- Configure email notification templates

## Troubleshooting

### Common Issues and Solutions

**Issue: Cannot access admin panel after role assignment**
- Solution: Log out completely and log back in to refresh authentication token

**Issue: SQL command fails to execute**
- Solution: Verify the email address matches exactly and user exists in auth.users table

**Issue: Admin privileges not working**
- Solution: Check user_roles table to confirm admin role is properly assigned

**Issue: Real-time updates not showing**
- Solution: Verify Supabase real-time subscriptions are enabled for the bookings table

### Best Practices

- Create backup admin accounts for redundancy
- Regularly review admin access logs
- Implement two-factor authentication for admin accounts
- Schedule regular database backups
- Monitor system performance and error logs

## Support

For technical support with admin setup:
1. Check the system logs for error messages
2. Verify database connections and permissions
3. Contact system administrator for role assignment issues
4. Review application documentation for additional guidance
