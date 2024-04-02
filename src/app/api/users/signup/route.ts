import { connectDB } from "@/dbconfig/dbConfig";
import User from "@/models/userModel";
import { NextResponse, NextRequest } from "next/server";
import bcryptjs from "bcryptjs";
import { sendEmail } from "@/helper/mailer";



connectDB();

export async function POST(request: NextRequest) {
  try {
    const  reqBody =  await request.json();
    const { username, email, password } = reqBody;
    // validation is pending here we are not doing it
    console.log(reqBody);

    const user = await User.findOne({ email });

    if (user) {
      return NextResponse.json(
        { error: "user already exists" },
        { status: 400 }
      );
    }

    const salt = await bcryptjs.genSalt(10);

    const hashedPassword = await bcryptjs.hash(password, salt);

    const newuser = new User({
      username,
      email,
      password: hashedPassword,
    });

   const savedsuer =  await newuser.save();

   console.log(savedsuer)

// as the user is saved now is time to share the mail what i wanted to be cx 

await sendEmail({email,emailType:'VERIFY', userId:savedsuer._id} )

return NextResponse.json({ message: "User restered successfully" , success:true ,savedsuer});





  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
