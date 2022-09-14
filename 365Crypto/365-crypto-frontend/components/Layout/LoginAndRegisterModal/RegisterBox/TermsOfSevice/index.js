import React from "react";
import styles from "./index.module.css";

const TermsOfService = () => {
  return (
    <div className={`p-4 ${styles["main-div"]}`}>
      <div className={`${styles["upper-div"]}`}>
        <div className={`${styles["title-div"]}`}>Terms Of Service</div>
        <div className={`${styles["content-div"]}`}>
          <p>365Crypto.com is a brand of V3 Digital.</p>
          <p>
            365Crypto strives to ensure that all information contained on pages
            hosted by 365Crypto.com is correct and up to date. We cannot,
            however, accept responsibility for the content of external websites
            linked to through 365Crypto.com. Third party content is accessed at
            the user’s own risk. 365Crypto.com cannot accept responsibility for
            any loss or inconvenience caused by reliance on any material
            contained in this site.
          </p>
          <p>
            Please note that despite the nature of much of the material created
            and hosted on this website, 365Crypto.com is not a financial
            reference resource and the opinions of authors and other
            contributors are their own and should not be taken as financial
            advice. If you require advice of this sort, 365Crypto strongly
            recommends contacting a qualified industry professional. All
            materials on this site are for informational purposes only. None of
            the material should be interpreted as investment advice.
          </p>
          <p>
            By using 365Crypto.com, you agree and consent to the policies
            contained in the above Terms of Service Agreement.
          </p>
          <p>
            Specifically, you agree to hold 365Crypto, its affiliates, officers,
            directors, employees, agents, and third party service providers
            harmless from and defend them against any claims, costs, damages,
            losses, expenses, and any other liabilities, including attorneys’
            fees and costs, arising out of or related to your access to or use
            of 365Crypto, your violation of this user agreement, and/or your
            violation of the rights of any third party or person.
          </p>
          <p>
            We will not be liable for any special, consequential, indirect,
            incidental, punitive, reliance, or exemplary damages, whether in
            tort, contract, or any other legal theory, arising out of or in any
            way connected with this agreement or your use of or attempt to use
            365Crypto, including (but not limited to) damages for loss of
            profits, goodwill, use, or data. This limitation on liability shall
            not be affected even if we have been advised of the possibility of
            such damages. Some states do not allow for the exclusion of implied
            warranties or the limitation or exclusion of liability for
            incidental or consequential damages, so the above exclusions may not
            apply to you. You may have other rights that vary from state to
            state.
          </p>{" "}
          <p>
            You agree to release us, our affiliates, and third-party service
            providers, and each associated director, employee, agents, and
            officers, from claims, demands and damages (actual and
            consequential), of every kind and nature, known and unknown,
            disclosed or undisclosed, arising out of or in any way connected to
            your use of 365Crypto.
          </p>{" "}
          <p>
            Any claim or dispute between you and us arising out of or relating
            to this user agreement, in whole or in part, shall be governed by
            the laws of England and Wales without respect to its conflict of
            laws provisions.
          </p>
          <p>
            If you have any questions on our Terms of Service you can contact
            support@365crypto.com.
          </p>{" "}
          <p className={`${styles["mid-title"]}`}>Affiliate Disclosure</p>{" "}
          <p>
            365Crypto participates in various affiliate marketing programs,
            which means 365Crypto may get paid commissions on purchases or
            signups made through our links to other sites.
          </p>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
