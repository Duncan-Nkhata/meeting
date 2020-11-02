/*
frappe.ui.form.on("Meeting", {
	after_save: function (frm) {
		frappe.call({
			method: "meeting.api.send_email",
			args: {
				meeting: frm.doc.name
			}
		});
	}
});
*/
frappe.ui.form.on("Meeting Attendee", {
	attendee: function (frm, cdt, cdn) {
		var attendee = frappe.model.get_doc(cdt, cdn);
		if (attendee.attendee) {
			// if attendee, get full name
			frappe.call({
				method: "meeting.meeting.doctype.meeting.meeting.get_full_name",
				args: {
					attendee: attendee.attendee
				},
				callback: function (r) {
					frappe.model.set_value(cdt, cdn, "full_name", r.message);
				}
			});

		} else {
			// if no attendee, clear full name
			frappe.model.set_value(cdt, cdn, "full_name", null);
		}
	},
});