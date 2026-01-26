import ProctoringLog from '../model/proctoring-log.model';
import ExamAttempt from '../../student/model/exam-attempt.model';

export class ProctoringService {
  // Step 1: Log activity
  async logActivity(activityData: {
    attempt_id: string;
    event_type: string;
    event_data: any;
    is_violation?: boolean;
    violation_type?: string;
  }): Promise<any> {
    return await ProctoringLog.create({
      ...activityData,
      timestamp: new Date()
    });
  }

  // Step 2: Detect violations
  async detectViolations(attemptId: string): Promise<any[]> {
    const violations = await ProctoringLog.find({
      attempt_id: attemptId,
      is_violation: true
    }).sort({ timestamp: -1 });

    return violations;
  }

  // Step 3: Get all logs for attempt
  async getAttemptLogs(attemptId: string): Promise<any[]> {
    return await ProctoringLog.find({ attempt_id: attemptId })
      .sort({ timestamp: -1 });
  }

  // Step 4: Check for suspicious activity
  async checkSuspiciousActivity(attemptId: string): Promise<{
    isSuspicious: boolean;
    violations: any[];
    score: number;
  }> {
    const violations = await this.detectViolations(attemptId);
    const violationScore = violations.length * 10; // Each violation adds 10 points
    const isSuspicious = violationScore >= 30; // Threshold: 30 points

    return {
      isSuspicious,
      violations,
      score: violationScore
    };
  }

  // Step 5: Monitor tab switches (client-side detection)
  async logTabSwitch(attemptId: string, data: any): Promise<any> {
    return await this.logActivity({
      attempt_id: attemptId,
      event_type: 'TAB_SWITCH',
      event_data: data,
      is_violation: true,
      violation_type: 'TAB_SWITCH'
    });
  }

  // Step 6: Monitor copy/paste (client-side detection)
  async logCopyPaste(attemptId: string, data: any): Promise<any> {
    return await this.logActivity({
      attempt_id: attemptId,
      event_type: 'COPY_PASTE',
      event_data: data,
      is_violation: true,
      violation_type: 'COPY_PASTE'
    });
  }
}

export default new ProctoringService();

