import UserContainer from "@/components/Container/User";

export default function UserDetailPage({params}: { params: { user_id: string } }) {
    return (
        <div>
            <UserContainer user_id={params.user_id}/>
        </div>
    )
}