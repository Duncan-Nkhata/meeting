import frappe
from frappe import _
from frappe.utils import nowdate, add_days


@frappe.whitelist()
def send_email(meeting):
    frappe.sendmail(
        recipients="duncan@thebantoo.com",
        sender="erp@thebantoo.com",
        subject="Email Test",
        message="Running Email Test!"
    )
    frappe.msgprint(_("Invitation Sent"))


@frappe.whitelist()
def get_meetings(start, end):
    if not frappe.has_permission("Meeting", "read"):
        raise frappe.PermissionError
    return frappe.db.sql("""select
		timestamp(`date`, from_time) as start,
		timestamp(`date`, to_time) as end,
		name,
		title,
		status,
		0 as all_day
	from `tabMeeting`
	where `date` between %(start)s and %(end)s""", {
        "start": start,
        "end": end
    }, as_dict=True)

