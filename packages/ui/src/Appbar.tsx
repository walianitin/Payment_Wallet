import { Button } from "./button";

interface AppbarProps {
    user?: {
        name?: string | null;
    },
    // TODO: can u figure out what the type should be here?
    onSignin: any,
    onSignout: any
}

export const Appbar = ({
    user,
    onSignin,
    onSignout
}: AppbarProps) => {
    return <div className="flex justify-between item-centre px-20 bg-black-200 border-b border-slate-300 h-16 round-2" >
        <div className=" bg-red-200 flex flex-col justify-center ">
            <div className="">
                <img src="../../../apps/user-app/public/logo_new.svg" ></img>
                </div>
        </div>
        <div className="flex flex-col justify-center pt-2 bg-blue-200">
            <Button onClick={user ? onSignout : onSignin}>{user ? "Logout" : "Login"}</Button>
        </div>
    </div>
}