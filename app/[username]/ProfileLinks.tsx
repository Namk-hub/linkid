import { ProfileLinkItem } from "./ProfileLinkItem";
import { EmptyProfileState } from "./EmptyProfileState";
import { Link } from "./types/type";

export function ProfileLinks({ links }: { links: Link[] }) {
    if (links.length === 0) {
        return <EmptyProfileState />;
    }

    return (
        <div className="space-y-3">
            {links.map((link) => (
                <ProfileLinkItem key={link.id} link={link} />
            ))}
        </div>
    );
}
