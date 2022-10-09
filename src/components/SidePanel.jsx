export default function SidePanel({ champArray }) {
  return (
    <>
      <div className="w-52">
        {champArray.map((champ) => (
          <div className=" text-white text-xl bg-gradient-to-r from-blue-500 to-fuchsia-400 bg-clip-text text-transparent">
            {champ.name}
          </div>
        ))}
      </div>
    </>
  );
}
