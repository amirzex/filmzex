import React from "react";

const CommonQuestion = () => {
  return (
    <div className=" flex flex-col ">
      <div className="flex flex-row justify-center">
        <div className="border-t-3 border-red-400 w-4/10"></div>
        <div className="flex flex-row text-center justify-center text-3xl font-sans w-1/10 relative">
          <p className="absolute top-[-25px]">Questions</p>
        </div>
        <div className="border-t-3 border-red-400 w-4/10"></div>
      </div>

      <div className="flex flex-col gap-10 text-2xl text-left scale-90 bg-gray-500/40 p-10 backdrop-blur-md">
        <p className="flex flex-col gap-10">
          ❓ Are the movies and series censored?
          <p>
            All content provided on FilmZex is offered without any edits or
            censorship
          </p>
        </p>
        <p>
          🎬 I downloaded a movie but it has no subtitles If you downloaded a
          SoftSub version, please check your device or media player settings. Go
          to the Subtitle menu and make sure subtitles are enabled and set to
          Persian (PER or FA). If subtitles still don’t appear, your device may
          not support this subtitle format.
        </p>
        <p>
          🔊 I downloaded a dubbed movie but it’s not playing in Persian Dubbed
          movies on FilmZex are dual-audio, meaning both the original and
          Persian dubbed tracks are included. If the original language is
          playing, go to the Audio menu in your player and switch the audio
          track to Persian. We recommend using VLC Player.
        </p>
        <p>
          📺 I downloaded a movie but only sound or video plays Due to the
          growing variety of audio and video formats, some files may not play
          properly on your device. Please update your media player to the latest
          version. Recommended players: - Windows: VLC Player (choose 32-bit or
          64-bit based on your system) - Android: MX Player, VLC Player
          (available on Google Play) - iOS: VLC for iOS, OPlayer (available on
          App Store)
        </p>
        <p>
          💬 Why aren’t my comments being approved? Comments are reviewed by our
          team before being published. Comments written in “Finglish,”
          containing requests, or reporting issues (before they’re reviewed and
          fixed) will not be approved. Only comments directly related to the
          movie or series and written in Persian will be published.
        </p>
        <p>
          🧑‍💻 Why am I getting an error when trying to register? Common reasons
          include: - Invalid characters like spaces or symbols (!, ?, *, &, @) -
          Duplicate usernames (try adding a number or unique letter to avoid
          this) - Minimum of 4 characters required - Incorrect email format:
          Your email must be entered without “www” and without spaces. An
          invalid email may cause issues with password recovery.
        </p>
        <p>
          ⏳ Why are series updates delayed? Most series are released with
          subtitles, and sometimes episodes take time to be translated. We wait
          until the translation is complete to ensure quality before publishing.
        </p>
        <p>
          💳 I purchased a subscription but my account wasn’t activated
          Activation may take up to 10 minutes. If your account isn’t activated
          within that time, the deducted amount will be refunded within 72
          business hours.
        </p>
        <p>
          📺 Why aren’t subtitles showing on my TV? Some TVs do not support
          SoftSub subtitle formats.
        </p>
        <p>
          📝 Why don’t some movies have embedded subtitles? All content on
          FilmZex is provided without embedded subtitles by default. If
          subtitles are available, they will be included. If not, the content
          will be posted without them.
        </p>
        <p>
          🎥 Can I request a specific movie or series? Yes! Just go to your user
          panel and submit your request in the “Request Movie/Series” section.
        </p>
        <p>
          📉 Why did my download stop or the file is incomplete? Please use a
          download manager to avoid interruptions: - PC: Internet Download
          Manager - Android: ADM - iPhone: Document or other download manager
          apps These tools allow you to resume downloads if your internet
          connection is interrupted.
        </p>
        <p>
          🚫 Can I download unlimited content daily? No. Each user is allowed to
          download content based on daily personal use. Excessive
          downloading—especially via virtual servers—will result in account
          deactivation.
        </p>
        <p>
          🌍 Can users outside Iran download and stream content? Yes,
          downloading and streaming are available to all users inside and
          outside Iran.
        </p>
        <p>
          🔁 Can I stream content with Persian dubbing? Yes, this feature is
          available to all users.
        </p>
      </div>
    </div>
  );
};

export default CommonQuestion;
