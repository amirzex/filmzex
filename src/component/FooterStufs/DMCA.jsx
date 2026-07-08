import React from "react";

const DMCA = () => {
  return (
    <div className=" w-[1920px] flex flex-col pt-10">
      <div className="flex flex-row justify-center">
        <div className="border-t-3 border-red-400 w-4/10"></div>
        <div className="flex flex-row text-center justify-center text-3xl font-sans w-1/10 relative">
          <p className="absolute top-[-25px]">DMCA</p>
        </div>
        <div className="border-t-3 border-red-400 w-4/10"></div>
      </div>

      <div className="flex flex-col text-2xl text-left scale-90 gap-10 bg-gray-500/40 backdrop-blur-md p-10">
        <b>DMCA Compliance Statement for FilmZex.com FilmZex.com</b>
        <p>
          FilmZex.com is in compliance with 17 U.S.C. § 512 and the Digital
          Millennium Copyright Act (“DMCA”). It is our policy to respond to any
          infringement notices and take appropriate actions under the DMCA and
          other applicable intellectual property laws. If your copyrighted
          material has been posted on FilmZex.com or if links to your
          copyrighted material appear in our search results and you wish to have
          it removed, you must provide a written communication containing the
          details listed below. Please note that misrepresenting infringing
          content may result in liability for damages, including legal fees. We
          recommend consulting an attorney before submitting a claim.
        </p>
        <b>📋 Required Elements of a DMCA Notice:</b>
        <p>
          To ensure proper handling of your request, please include the
          following:
        </p>
        <p>
          - ✅ Evidence that you are authorized to act on behalf of the
          copyright owner.
        </p>
        <p>
          - 📧 Sufficient contact information, including a valid email address
        </p>
        <p>
          - 🔍 A detailed description of the copyrighted work allegedly
          infringed, including at least one search term under which the material
          appears on FilmZex.com.
        </p>
        <p>
          - 🙅 A statement affirming your good faith belief that the use of the
          material is not authorized by the copyright owner, its agent, or the
          law.
        </p>
        <p>
          - 🧾 A statement that the information in the notification is accurate,
          and under penalty of perjury, that you are authorized to act on behalf
          of the copyright owner.
        </p>
        <p>- ✍️ A physical or electronic signature of the authorized person</p>
        <b className="text-2xl">📨 Where to Send Your Notice:</b>
        <p>
          Please send your written infringement notice to the following email
          address:
        </p>
        <b>FilmZex.com@gmail.com</b>
        <p>
          Due to ongoing development and occasional issues with our search
          engine, we cannot guarantee complete removal unless you provide
          clickable direct links to each publication containing the infringing
          material. Only in this case can we ensure full removal.
        </p>
        <p>
          Please allow 1–3 business days for a response. Contacting other
          parties such as our hosting provider will not expedite your request
          and may delay resolution.
        </p>
      </div>
    </div>
  );
};

export default DMCA;
