import MarkAllAsRead from "./mark-all-as-read";
import NoticeList from "./notice-list";

const StudentNotice = () => {
	return (
		<div className="space-y-4">
			<MarkAllAsRead />
			<NoticeList />
		</div>
	);
};

export default StudentNotice;
