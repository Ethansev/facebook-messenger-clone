import Sidebar from "../components/sidebar/Sidebar";

export default async function UsersLayout({ children }: { children: React.ReactNode; }) {
    return (
        // special tag to fix our typescript error
        // @ts-expect-error Server Component
        <Sidebar>
            <div className='h-full'>
                { children }
            </div>
        </Sidebar>
    )
}