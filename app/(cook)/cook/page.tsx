import { ItemControl } from "./ItemControl";
import CookWeeklyMenu from "./menu/CookWeeklyMenu";

const CookHome = () => {
	return (
		<div className="grid gap-4">
			<ItemControl limit={5} />
			<CookWeeklyMenu />
		</div>
	);
};

export default CookHome;
