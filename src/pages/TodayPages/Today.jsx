import { useContext } from "react";
import { LevelContext } from "../../LevelContext";

export default function Today() {
    const {user } = useContext(LevelContext)
    console.log(user)
    return (
        <div>
            
        </div>
    )

}