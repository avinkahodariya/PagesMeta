import { HeaderBar } from './header'

export function Layout({ children }) {
    return (
        <>
            <HeaderBar />
            <div className="p-3">{children}</div>
        </>
    )
}
