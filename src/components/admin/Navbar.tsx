export type Tab = {
    text?: string,
    onClick: () => void,
    icon?: JSX.Element,
    active?: boolean
}

type NavbarType = {
    startTabs?: Tab[]
    middleTabs?: Tab[]
    endTabs?: Tab[]
}

export default function Navbar({startTabs: start, middleTabs: middle, endTabs: end}: NavbarType) {

    const getTabObjs = (tabs:Array<Tab>) => {
        return tabs && tabs.map((tab, index) => (
            <button className={`btn btn-ghost ${tab.active && 'btn-active'} text-xl`} onClick={tab.onClick} key={index}>
                {tab.icon ?? null}
                {tab.text ?? null}
            </button>
        ))
    }

    return (
        <div className="px-5">
            <div className="navbar bg-navbar-blue mt-2 shadow-xl rounded-box">
                <div className="navbar-start">
                    {
                        getTabObjs(start)
                    }
                </div>
                <div className="navbar-center lg:flex">
                    <ul className="menu menu-horizontal px-1 gap-4">
                        {
                            getTabObjs(middle)
                        }
                    </ul>
                </div>
                <div className="navbar-end">
                    {
                        getTabObjs(end)
                    }
                </div>
            </div>
        </div>
    )
}