import React from 'react';
import { ProcessLog as ProcessLogType } from '../data/types';

interface ProcessLogProps {
    logs: ProcessLogType[];
}

export const ProcessLog: React.FC<ProcessLogProps> = ({ logs }) => {
    return (
        <div className="bg-white rounded-xl p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">Log Proses</h2>
            <div className="bg-gray-900 text-green-400 p-4 rounded-lg h-64 overflow-y-auto font-mono text-sm">
                {logs.length === 0 ? (
                    <div className="text-gray-500">Menunggu input...</div>
                ) : (
                    logs.map((log, idx) => (
                        <div key={idx} className="mb-1">
                            <span className="text-gray-500">[{log.time}]</span> {log.message}
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};
