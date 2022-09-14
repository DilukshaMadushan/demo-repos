import React from "react";
import styles from "./index.module.css";

const PrivacyPolicy = () => {
  return (
    <div className={`p-4 ${styles["main-div"]}`}>
      <div className={`${styles["upper-div"]}`}>
        <div className={`${styles["title-div"]}`}>Privacy Policy</div>
        <div className={`${styles["content-div"]}`}>
          <p>
            Thank you for visiting 365Crypto.com (“the Service,” “we” or “us”).
            Your privacy is important to us. This privacy policy only covers
            this website. Websites linked to from this site are not covered by
            this policy. Please be alert when you leave our site and read the
            privacy statements of each and every website that collects
            personally identifiable information. This Privacy Policy, as amended
            or otherwise changed from time to time (the “Privacy Policy”),
            explains the manner in which we collect, use, maintain and disclose
            user information obtained through the Service. By using the Service,
            you (“User”) consent to the data practices prescribed in this
            Privacy Policy. On occasion, we may revise this Privacy Policy to
            reflect changes in law, our personal data collection and use
            practices, the features on the Service, or advances in technology.
            If material changes are made to this Privacy Policy, the changes
            will be prominently posted on the Service. Capitalized terms not
            defined herein shall have the meanings ascribed to them in the Terms
            of Use.
          </p>
          <p className={`${styles["quiz"]}`}>
            1. What information do we collect?
          </p>
          <p>
            If you open an account to utilize the forums or the trollbox on the
            Service, we will collect your email address. Posting comments on the
            Service requires registration with a third-party. We do not have any
            access to the personal information that you provide to that
            third-party, other than your user name, which will be displayed
            publicly on our site. If you choose to register so that you may post
            comments, please read the privacy policy of the third-party to whom
            you are providing personal information in connection with the
            registration process. We also collect passive information which
            includes, but is not limited to, IP addresses, referral URLs, your
            location, and other session data.
          </p>
          <p className={`${styles["quiz"]}`}>
            2. How do we use the information we collect?
          </p>
          <p>
            The personal data we collect will not be given or sold to any third
            parties. We may use the personal data and information we collect: a)
            to enforce the legal terms (including without limitation our
            policies and terms of service) that govern your use of our Service,
            and/or for the purposes for which you provided the personal data; b)
            to provide technical support for the Service; c) to prevent fraud or
            potentially illegal activities (including, without limitation,
            copyright infringement) on or through the Service; or d) to protect
            the safety of our Users.
          </p>
          <p className={`${styles["quiz"]}`}>
            3. When would we disclose the information we collect?
          </p>{" "}
          <p>
            We may disclose the information we collect: a) in response to legal
            process, for example, in response to a court order or a subpoena, a
            law enforcement or government agency’s request or similar request;
            or b) to third parties in order to investigate, prevent, or take
            action (in our sole discretion) regarding potentially illegal
            activities, suspected fraud, situations involving potential threats
            to any person, us, or the Service, or violations of our policies,
            the law or our Terms of Use, to verify or enforce compliance with
            the policies governing our Services. Other than as stated in this
            Privacy Policy, we do not disclose any of your personal information
            to third parties unless required to do so by law enforcement, court
            order, or in compliance with legal reporting obligations.
          </p>{" "}
          <p className={`${styles["quiz"]}`}>
            4. Retention of Personal Information
          </p>
          <p>
            You can update your information by contacting us at
            info(at)365Crypto.com. We will retain your information for as long
            as your account has not been closed or as needed to provide you
            access to your account. If you wish to close your account, contact
            us at info(at)365Crypto.com. We will retain and use your information
            as necessary to comply with our legal obligations, resolve disputes,
            and enforce our Terms of Use.
          </p>{" "}
          <p className={`${styles["quiz"]}`}>5. How do we use cookies?</p>{" "}
          <p>
            We collect web browser information in order to enhance your
            experience on the site and track how the Service is being used.
            Cookies are small data files that are stored on your computer’s hard
            drive, and in addition to using cookies to provide you with a better
            user experience, we use cookies to identify and prevent fraudulent
            activity. These cookies contain no information intended to identify
            you personally. The information collected can include, but is not
            limited to, your IP address, referral URLs, the type of device you
            use, your operating system, the type of browser you use, geographic
            location, and other session data. Cookies are not permanent and will
            expire after a short time period of inactivity. You may opt to
            deactivate your cookies, but it is important to note that you may
            not be able to access or use some features of our site. We are not
            responsible and we cannot be held liable for any loss resulting from
            your decision or inability to use such features.
          </p>
          <p className={`${styles["quiz"]}`}>
            6. How do we protect your personal information?
          </p>
          <p>
            We take the protection of your personal information seriously. We
            use industry-standard data encryption technology and have
            implemented restrictions related to the storage of and the ability
            to access your personal information. 365Crypto.com servers and
            business operations are entirely located in the United States.
            Please note that no transmission over the Internet or electronic
            storage method is guaranteed to be 100% secure.
          </p>
          <p className={`${styles["quiz"]}`}>7. Contact Information</p>
          <p>
            If you have any questions about the foregoing Privacy Policy as
            outlined above, please contact us at info(at)365Crypto.com
          </p>
          <p>This Privacy Policy was last updated on 5 October, 2017.</p>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
