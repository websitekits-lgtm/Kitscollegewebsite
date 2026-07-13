# EmailJS Email Template - HTML Body

**Use this HTML for the EmailJS template "Content" field.**

Replace the existing content with the HTML below. All form fields are included.

---

## **HTML Email Body**

```html
<!DOCTYPE html>
<html>
<head>
  <style>
    body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
    .container { max-width: 700px; margin: 0 auto; padding: 20px; }
    .header { background: linear-gradient(135deg, #003d7a 0%, #0056b3 100%); color: white; padding: 20px; border-radius: 8px 8px 0 0; text-align: center; }
    .header h1 { margin: 0; font-size: 24px; }
    .header p { margin: 5px 0 0 0; font-size: 14px; opacity: 0.9; }
    .section { margin: 20px 0; border-left: 4px solid #0056b3; padding: 15px; background: #f8f9fa; }
    .section h3 { margin: 0 0 15px 0; color: #003d7a; font-size: 16px; text-transform: uppercase; letter-spacing: 1px; }
    table { width: 100%; border-collapse: collapse; }
    td { padding: 10px; border-bottom: 1px solid #ddd; }
    td:first-child { font-weight: bold; width: 35%; color: #003d7a; }
    .footer { background: #f8f9fa; border-top: 2px solid #0056b3; padding: 20px; margin-top: 30px; text-align: center; font-size: 12px; color: #666; }
    .college-logo { max-width: 100px; margin-bottom: 10px; }
  </style>
</head>
<body>
  <div class="container">
    
    <!-- HEADER -->
    <div class="header">
      <h1>📋 New Admission Application</h1>
      <p>Krishna Chaitanya Institute of Technology & Sciences</p>
    </div>

    <!-- APPLICANT MESSAGE -->
    <p style="margin-top: 20px; padding: 15px; background: #e7f3ff; border-left: 4px solid #0056b3; border-radius: 4px;">
      A new student has submitted an admission application for B.Tech 2026-27. Please review the details below and contact the applicant for further verification.
    </p>

    <!-- SECTION 1: PERSONAL DETAILS -->
    <div class="section">
      <h3>👤 Personal Details</h3>
      <table>
        <tr>
          <td>Full Name</td>
          <td><strong>{{first_name}} {{last_name}}</strong></td>
        </tr>
        <tr>
          <td>Father/Guardian Name</td>
          <td>{{father_name}}</td>
        </tr>
        <tr>
          <td>Mother Name</td>
          <td>{{mother_name}}</td>
        </tr>
        <tr>
          <td>Date of Birth</td>
          <td>{{dob}}</td>
        </tr>
        <tr>
          <td>Gender</td>
          <td>{{gender}}</td>
        </tr>
        <tr>
          <td>Mobile Number</td>
          <td><a href="tel:{{mobile}}">{{mobile}}</a></td>
        </tr>
        <tr>
          <td>Alternate Mobile</td>
          <td>{{alternate_mobile}}</td>
        </tr>
        <tr>
          <td>Email ID</td>
          <td><a href="mailto:{{email}}">{{email}}</a></td>
        </tr>
        <tr>
          <td>Aadhaar Number</td>
          <td>{{aadhaar}}</td>
        </tr>
        <tr>
          <td>Nationality</td>
          <td>{{nationality}}</td>
        </tr>
        <tr>
          <td>Religion</td>
          <td>{{religion}}</td>
        </tr>
        <tr>
          <td>Category</td>
          <td><strong>{{category}}</strong></td>
        </tr>
        <tr>
          <td>Blood Group</td>
          <td>{{blood_group}}</td>
        </tr>
        <tr>
          <td>Physically Challenged</td>
          <td>{{physically_challenged}}</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 2: ADDRESS DETAILS -->
    <div class="section">
      <h3>📍 Address Details</h3>
      <table>
        <tr>
          <td>Street Address</td>
          <td>{{address}}</td>
        </tr>
        <tr>
          <td>Landmark</td>
          <td>{{landmark}}</td>
        </tr>
        <tr>
          <td>City / Village</td>
          <td>{{city}}</td>
        </tr>
        <tr>
          <td>District</td>
          <td>{{district}}</td>
        </tr>
        <tr>
          <td>State</td>
          <td>{{state}}</td>
        </tr>
        <tr>
          <td>Pincode</td>
          <td>{{pincode}}</td>
        </tr>
        <tr>
          <td>Country</td>
          <td>{{country}}</td>
        </tr>
      </table>
    </div>

    <!-- SECTION 3: PROGRAM SELECTION -->
    <div class="section">
      <h3>🎓 Program Selection</h3>
      <table>
        <tr>
          <td>Program Type</td>
          <td><strong>{{program_type}}</strong></td>
        </tr>
        <tr>
          <td>Course / Specialization</td>
          <td><strong>{{course}}</strong></td>
        </tr>
      </table>
    </div>

    <!-- SECTION 4: PREFERENCES -->
    <div class="section">
      <h3>⚙️ Facility Preferences</h3>
      <table>
        <tr>
          <td>Hostel Facility Required</td>
          <td>{{hostel}}</td>
        </tr>
        <tr>
          <td>Transport Facility Required</td>
          <td>{{transport}}</td>
        </tr>
      </table>
    </div>

    <!-- FOOTER WITH COLLEGE DETAILS -->
    <div class="footer">
      <p style="margin: 0; font-weight: bold; color: #003d7a; font-size: 14px;">
        Krishna Chaitanya Institute of Technology & Sciences
      </p>
      <p style="margin: 5px 0;">
        📍 Markapur, Prakasam District, Andhra Pradesh 523316, India<br>
        📞 Phone: 08596-200330 / 331<br>
        🌐 Website: <a href="https://www.kits-anna.com" style="color: #0056b3;">www.kits-anna.com</a><br>
        ✉️ Email: <a href="mailto:admissions@kits-anna.com" style="color: #0056b3;">admissions@kits-anna.com</a>
      </p>
      <hr style="border: none; border-top: 1px solid #ddd; margin: 15px 0;">
      <p style="margin: 10px 0; color: #999;">
        This is an automated email from the KITS admission portal. Please do not reply to this email.<br>
        For inquiries, contact the admissions office directly.
      </p>
    </div>

  </div>
</body>
</html>
```

---

## **How to Update:**

1. Go to EmailJS dashboard → **Email Templates**
2. Click your `Contact Us` template
3. Click **"Edit Content"** button
4. Replace everything with the HTML above
5. Click **Save**

---

## **Your Questions Answered:**

### ✅ **Will it work after deploying?**
**YES, perfectly!** EmailJS works the same on production. No backend needed. Just update the 3 credentials in the deployed code.

### 📊 **Free Tier Capacity:**
- **200 emails/month** = ~6-7 per day
- **No real-time limit** — you can send 50 emails in 1 minute if you want
- More than enough for admissions (unless you get 100+ applications per day)
- If you exceed, upgrade to **paid plan** ($15/month for 5,000 emails/month)

### 🛡️ **Robustness (already included in form):**
- ✅ Required field validation (firstname, lastname, father name, mobile, declaration)
- ✅ Success/Error banners with user feedback
- ✅ Loading state (spinner while sending)
- ✅ Form reset after success
- ✅ SessionStorage so users can't spam
- ✅ All form data formatted nicely in email

---

**Update the template in EmailJS and you're done!** 🎉
