import Icon from "../icon";

export default function NotAuthorized() {
  return (
    <div className="flex flex-col items-center justify-center gap-10">
      <Icon
        icon="fluent-mdl2:protect-restrict"
        className="text-warning text-opacity-80 h-56 w-56"
      />

      <h3 className="text-warning text-4xl font-bold">Not Authorized!</h3>
    </div>
  );
}
