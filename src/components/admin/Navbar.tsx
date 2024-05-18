import Button from "../Button"

export type Tab = {
    text?: string,
    onClick?: () => void,
    icon?: JSX.Element,
    active?: boolean,
    visible?: boolean
    customElement?: JSX.Element
}

type NavbarType = {
    startTabs?: Tab[]
    middleTabs?: Tab[]
    endTabs?: Tab[]
}

export default function Navbar({startTabs: start, middleTabs: middle, endTabs: end}: NavbarType) {

    const getTabObjs = (tabs:Array<Tab>) => {
        return tabs && tabs.map((tab, index) => (
            <>
                {tab.customElement ? tab.customElement :
                    <Button text={tab.text} icon={tab.icon} visible={tab.visible} active={tab.visible} onClick={tab.onClick} key={index}/>
                }
            </>
        ))
    }

    return (
        <div className="px-5 fixed top-0 left-0 w-full text-white shadow-md z-10">
            <div className="navbar bg-navbar-blue mt-2 shadow-xl rounded-box">
                <div className="navbar-start gap-2">
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
                <div className="navbar-end gap-2">
                    {
                        getTabObjs(end)
                    }
                </div>
            </div>
        </div>
    )
}