import React from "react";

const Role = () => {
  return (
    <div className="flex flex-col pt-8 px-4 md:px-8 max-w-4xl mx-auto w-full">
      <div className="flex items-center justify-center gap-4 pt-6 pb-8">
        <div className="h-px flex-1 bg-red-400"></div>
        <p className="text-2xl md:text-3xl font-sans whitespace-nowrap">Roles</p>
        <div className="h-px flex-1 bg-red-400"></div>
      </div>

      <div className="flex flex-col gap-6 md:gap-10 text-base md:text-2xl text-left bg-gray-500/40 backdrop-blur-md p-6 md:p-10 rounded-xl">
        <p className="flex flex-col gap-10">
          Dear User
          <p>
            Thank you for choosing FilmZex as your platform for downloading and
            watching your favorite movies and series. Naturally, using any
            service comes with its own terms and conditions. If you wish to use
            FilmZex, you are required to follow these rules. Please read them
            carefully—because the more clarity we have, the fewer
            misunderstandings there will be.
          </p>
        </p>
        <p>
          1. Access to FilmZex To use the website and app, you need an active
          internet connection. If your internet service provider experiences
          disruptions, FilmZex is not obligated to resolve the issue by changing
          its domain. However, we always do our best to ensure smooth access to
          our service.
        </p>
        <p>
          2. Subscription Purchase Some content on the website requires a
          subscription. These subscriptions help cover the ongoing costs of
          running the service. Purchasing a subscription grants you access to
          specific content on FilmZex
        </p>
        <p>
          3. Internet Usage Changing your subscription plan does not affect how
          your internet usage is calculated. Additionally, streaming and
          downloading movies and series on FilmZex is offered at half the usual
          data cost!
        </p>
        <p>
          4. Provided Content FilmZex offers all movie and series content
          without any modifications (such as censorship or edits). Users are
          responsible for choosing content that aligns with their personal,
          cultural, or social preferences. FilmZex is not liable for the nature
          of the content or its impact on viewers.
        </p>
        <p>
          5. Subscription Accuracy Please be careful when purchasing a
          subscription. FilmZex does not accept claims related to mistaken
          purchases.
        </p>
        <p>
          6. Multiple Accounts & Account Sharing FilmZex does not allow users to
          create multiple accounts or share their account access with third
          parties. If our system detects such activity, the account will be
          blocked.
        </p>
        <p>
          7. User Comments Users must avoid offensive language and political
          discussions in the comments section. Only relevant and constructive
          comments related to the specific movie or series will be published.
          Comments must be written in Persian (Farsi).
        </p>
        <p>
          8. Content Requests Requests for movies and series are reviewed based
          on priority and will be added to the site as soon as possible. Please
          avoid excessive follow-ups—your request will be addressed in due time,
          so patience is appreciated.
        </p>
        <p>
          9. Refund Policy Payments made on the site are non-refundable. Please
          review all terms, conditions, and content details before making a
          purchase.
        </p>
        <p>Thank you for your support and cooperation. —The FilmZex Team</p>
      </div>
    </div>
  );
};

export default Role;
