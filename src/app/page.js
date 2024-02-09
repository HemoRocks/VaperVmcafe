'use client'
import styles from "./page.module.css";
import { useState } from 'react';
import Image from "next/image";

export default function Home() {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [success, setSuccess]=useState(false);
  const [invalid, setinvalid] = useState(false);
  const [textP,settextP] = useState("");
  const validateBasicEmail = (email) => {
    return email.includes('@') && email.includes('.');
  };
  const validatePhoneNumber = (input_str) => {
    const re = /^\d{10}$/;
    return re.test(input_str);
  }

  const handleSubmit = async () => {
    if (validateBasicEmail(email) && validatePhoneNumber(phone) ) {
      const myObject = {"Email":email, "Phone":phone};
      const jsonString = JSON.stringify(myObject);
      console.log(jsonString);
      const response = await fetch('http://localhost:3500/Users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        
        body: [jsonString],
      });

      if (response.ok) {
        // Handle success (e.g., show a confirmation message)
        console.log('Data saved successfully!');
        setSuccess(true);
        //Success();
      } else {
        // Handle error
        console.error('Error saving data.');
      }
    } else{
        setinvalid(true);
        settextP("Either the email or the phone number is invalid")
    }
    
  };

  if (success == false){
    return (
      <main className={styles.main}>
        <p className={styles.title}>Ibrahim's Coffee House</p>
        <div className={styles.textInputdiv}>
          <p className={styles.textInputlabel}>Email</p>
          <input
            type="email"
            value={email}
            placeholder="example@example.com"
            required
            onChange={(e) => setEmail(e.target.value)}
            className={styles.textInput}
            autoComplete="on"            
          />
          <p className={styles.textInputlabel}>Phone Number</p>
          <input
            type="tel"
            placeholder="0550000000"
            value={phone}
            required
            pattern="[0-9]{10}"
            onChange={(e) => setPhone(e.target.value)}
            className={styles.textInput}
          />
          <p className={styles.invalid}>{textP}</p>
          <button onClick={handleSubmit} className={styles.button}>Submit</button>
        </div>
      </main>
    );
  }else{
    return (
      <main className={styles.main2}>
        <p className={styles.title}>Ibrahim's Coffee House</p>
        {/* <p className={styles.succeed}>Success</p> */}
        <div className={styles.imagesgroup}>
          <div className={styles.images}>
            <Image src={require('./beans.png')} 
              className={styles.beans}
              priority
            />
            <p className={styles.coffee_text}>Fresh roasted coffee beans are the ultimate choice for coffee lovers who want to enjoy the full flavor and aroma of their favorite brew. Roasting coffee beans transforms the green, raw beans into the brown, fragrant ones that we know and love. Roasting also develops the complex chemical compounds that give coffee its distinctive taste and health benefits. Different roasting levels, from light to dark, affect the color, body, acidity, and sweetness of the coffee. Fresh roasted coffee beans should be consumed within a few weeks of roasting, as they lose their freshness and flavor over time. </p>
          </div>
          <div className={styles.images}>
            <p className={styles.coffee_text}> Coffee can be brewed in different ways, such as drip, pour-over, French press, or espresso. Depending on the brewing method, the caffeine content, taste, and aroma of the coffee can vary. A cup of coffee can also be customized with various additions, such as milk, cream, sugar, honey, spices, or syrups.</p>
            <Image src={require('./cup.png')} 
              className={styles.cup}
              priority
            />
          </div>
        </div>
      </main>
    );
  }
}
