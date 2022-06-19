import { useState } from "react";
import DatePicker from "react-date-picker";

interface TakeSunRoleProps {
    handleDate: (endDate: Date) => void
    handleCancel: () => void;
}

function TakeSunRole({ handleDate, handleCancel }: TakeSunRoleProps) {
    const [endDate, setEndDate] = useState(new Date());

    return (
        <>
            <p style={{
                position: 'fixed',
                left: '140px',
                top: '60px',
            }}>
                תאריך סיום:
            </p >
            <div style={{
                position: 'fixed',
                left: '135px',
                top: '350px',
            }}>
                <DatePicker
                    onChange={(date: Date) => setEndDate(date)}
                    value={endDate}
                    format="dd-MM-y"
                    locale="he"
                />
                <div>
                    <button type="button"
                        className="btn btn-success"
                        // onClick={() => handleDate(`${endDate}`)}
                        onClick={() => handleDate(endDate)}
                    >
                        אישור
                    </button>
                    <button type="button"
                        className="btn btn-secondary"
                        onClick={handleCancel}
                    >
                        ביטול
                    </button>
                </div>
            </div>
        </>
    )
}

export default TakeSunRole;