import SettingsHeaderImage from "@/assets/setting-header.png";

const Notifications = () => {
  return (
    <div
      className="relative h-64 rounded-lg flex items-center justify-center mb-5 text-white text-xl font-bold 
                 bg-cover bg-center bg-no-repeat bg-[length:200%_200%] animate-bgMove"
      style={{
        backgroundImage: `linear-gradient(310deg, rgba(88, 116, 200, 0.6), rgba(51, 86, 190, 0.6)), url(${SettingsHeaderImage})`,
      }}
    >
      QUINLY COMING SOON
    </div>
  );
};

export default Notifications;
